#!/usr/bin/env python3
"""
Reddit User Persona Analyzer - Streamlit Web Interface
A user-friendly web interface for analyzing Reddit user profiles and generating personas.
"""

import streamlit as st
import os
import sys
from datetime import datetime
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from reddit_persona_analyzer import RedditPersonaAnalyzer

# Page configuration
st.set_page_config(
    page_title="Reddit User Persona Analyzer",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    html, body, [data-testid="stAppViewContainer"] {
        background: #181A1B !important;
        color: #F3F4F6 !important;
    }
    /* Main header */
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        color: #F3F4F6;
        margin-bottom: 2rem;
        letter-spacing: 1px;
        text-shadow: 1px 2px 8px #00000055;
    }
    /* Sub-header */
    .sub-header {
        font-size: 1.5rem;
        color: #A3E7FC;
        margin-bottom: 1rem;
        font-weight: 600;
        letter-spacing: 0.5px;
    }
    /* Card style for metrics and persona sections */
    .metric-card, .persona-section {
        background: #232526;
        padding: 1.2rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 2px 8px #00000033;
        margin-bottom: 1.2rem;
        border-left: 5px solid #A3E7FC;
        transition: box-shadow 0.2s;
    }
    .metric-card:hover, .persona-section:hover {
        box-shadow: 0 4px 16px #00000055;
    }
    /* Sidebar tweaks */
    section[data-testid="stSidebar"] {
        background: #232526 !important;
        color: #F3F4F6 !important;
        border-right: 2px solid #222;
    }
    /* Button tweaks */
    .stButton > button {
        background: linear-gradient(90deg, #232526 60%, #181A1B 100%);
        color: #A3E7FC;
        font-weight: 600;
        border-radius: 0.5rem;
        border: 1.5px solid #A3E7FC;
        box-shadow: 0 2px 8px #00000033;
        transition: background 0.2s, box-shadow 0.2s;
    }
    .stButton > button:hover {
        background: #181A1B;
        color: #F3F4F6;
        box-shadow: 0 4px 16px #00000055;
    }
    /* Input tweaks */
    .stTextInput > div > input {
        border-radius: 0.5rem;
        border: 1.5px solid #A3E7FC;
        background: #181A1B;
        color: #F3F4F6;
        padding: 0.5rem 1rem;
    }
    /* Expander tweaks */
    .stExpanderHeader {
        font-weight: 600;
        color: #A3E7FC;
    }
    /* Tab tweaks */
    .stTabs [data-baseweb="tab"] {
        font-size: 1.1rem;
        font-weight: 600;
        color: #A3E7FC;
        border-radius: 0.5rem 0.5rem 0 0;
        background: #232526;
        margin-right: 0.5rem;
    }
    /* Divider */
    hr {
        border: none;
        border-top: 2px solid #333;
        margin: 2rem 0 1.5rem 0;
    }
    .stMarkdown, .stText, .stSubheader, .stHeader, .stCaption, .stInfo, .stSuccess, .stWarning, .stError {
        color: #F3F4F6 !important;
    }
    .stMetricLabel, .stMetricValue {
        color: #A3E7FC !important;
    }
    .stDownloadButton > button {
        background: #232526;
        color: #A3E7FC;
        border: 1.5px solid #A3E7FC;
        border-radius: 0.5rem;
    }
    .stDownloadButton > button:hover {
        background: #181A1B;
        color: #F3F4F6;
    }
</style>
""", unsafe_allow_html=True)

def human_readable_account_age(created_utc):
    from datetime import datetime
    now = datetime.utcnow()
    created = datetime.utcfromtimestamp(created_utc)
    delta = now - created
    years = delta.days // 365
    months = (delta.days % 365) // 30
    days = (delta.days % 365) % 30
    parts = []
    if years > 0:
        parts.append(f"{years} year{'s' if years != 1 else ''}")
    if months > 0:
        parts.append(f"{months} month{'s' if months != 1 else ''}")
    if days > 0 or not parts:
        parts.append(f"{days} day{'s' if days != 1 else ''}")
    return ' '.join(parts)

def main():
    """Main Streamlit application."""
    
    # Header
    st.markdown('<h1 class="main-header">🔍 Reddit User Persona Analyzer</h1>', unsafe_allow_html=True)
    st.markdown("---")
    
    # Sidebar
    with st.sidebar:
        st.header("⚙️ Configuration")
        st.markdown("<hr>", unsafe_allow_html=True)
        # API Status
        st.subheader("API Status")
        try:
            analyzer = RedditPersonaAnalyzer()
            st.success("✅ APIs Connected")
        except Exception as e:
            st.error(f"❌ API Error: {str(e)}")
            st.info("Please check your config.env file")
            return
        st.markdown("<hr>", unsafe_allow_html=True)
        # Analysis Settings
        st.subheader("Analysis Settings")
        post_limit = st.slider("Posts to analyze", 10, 100, 30)
        comment_limit = st.slider("Comments to analyze", 20, 200, 50)
        st.markdown("<hr>", unsafe_allow_html=True)
        st.markdown("### 📊 About")
        st.markdown("""
        <div style='font-size:1.05rem;line-height:1.6;'>
        This tool analyzes Reddit user profiles to create detailed personas including:<br><br>
        • <b>Demographics</b> - Age, location, occupation<br>
        • <b>Psychology</b> - Personality traits, communication style<br>
        • <b>Online Behavior</b> - Reddit usage patterns<br>
        • <b>Expertise</b> - Knowledge areas and interests<br>
        • <b>Social Dynamics</b> - Community engagement<br><br>
        Each characteristic includes citations from actual posts/comments.
        </div>
        """, unsafe_allow_html=True)
    
    # Main content
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown('<div class="persona-section"><h2 class="sub-header">📝 Enter Reddit Profile URL</h2>', unsafe_allow_html=True)
        
        # URL input
        profile_url = st.text_input(
            "Reddit Profile URL",
            placeholder="https://www.reddit.com/user/username/",
            help="Enter a Reddit user profile URL to analyze"
        )
        
        # Example URLs
        with st.expander("💡 Example URLs"):
            st.code("""
https://www.reddit.com/user/kojied/
https://www.reddit.com/user/Hungry-Move-6603/
            """)
        
        # Analysis button
        if st.button("🚀 Analyze User", type="primary", use_container_width=True):
            if not profile_url:
                st.error("Please enter a Reddit profile URL")
            else:
                analyze_user(profile_url, post_limit, comment_limit)
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        st.markdown('<div class="persona-section"><h2 class="sub-header">📈 Quick Stats</h2>', unsafe_allow_html=True)
        
        # Placeholder for stats
        if 'analysis_results' not in st.session_state:
            st.info("Run an analysis to see statistics here")
        else:
            display_quick_stats()
        st.markdown('</div>', unsafe_allow_html=True)

def analyze_user(profile_url: str, post_limit: int, comment_limit: int):
    """Analyze a Reddit user and display results."""
    
    try:
        # Initialize analyzer
        analyzer = RedditPersonaAnalyzer()
        
        # Progress tracking
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        # Step 1: Extract username
        status_text.text("🔍 Extracting username...")
        progress_bar.progress(20)
        
        username = analyzer.extract_username_from_url(profile_url)
        
        # Step 2: Fetch user data
        status_text.text("📥 Fetching user activity...")
        progress_bar.progress(40)
        
        user_data = analyzer.get_user_activity(username, post_limit, comment_limit)
        
        # Step 3: Generate persona
        status_text.text("🧠 Analyzing persona...")
        progress_bar.progress(70)
        
        persona_data = analyzer.analyze_user_persona(user_data)
        
        # Step 4: Generate report
        status_text.text("📄 Generating report...")
        progress_bar.progress(90)
        
        report = analyzer.generate_persona_report(persona_data, username)
        
        # Step 5: Save report
        output_file = analyzer.save_persona_report(report, username)
        
        # Complete
        progress_bar.progress(100)
        status_text.text("✅ Analysis complete!")
        
        # Store results in session state
        st.session_state.analysis_results = {
            'username': username,
            'user_data': user_data,
            'persona_data': persona_data,
            'report': report,
            'output_file': output_file
        }
        
        # Display results
        display_results()
        
    except Exception as e:
        st.error(f"❌ Analysis failed: {str(e)}")
        st.info("Please check the URL and try again")

def display_results():
    """Display analysis results."""
    
    results = st.session_state.analysis_results
    username = results['username']
    user_data = results['user_data']
    persona_data = results['persona_data']
    
    st.success(f"✅ Analysis completed for u/{username}")
    
    # Download button
    with open(results['output_file'], 'r') as f:
        st.download_button(
            label="📥 Download Full Report",
            data=f.read(),
            file_name=f"persona_{username}.txt",
            mime="text/plain"
        )
    
    # Tabs for different views
    tab1, tab2, tab3, tab4 = st.tabs(["📊 Overview", "👤 Persona Details", "📈 Activity Analysis", "📄 Full Report"])
    
    with tab1:
        display_overview(user_data, persona_data)
    
    with tab2:
        display_persona_details(persona_data)
    
    with tab3:
        display_activity_analysis(user_data)
    
    with tab4:
        # Render Markdown for the full report if available
        if 'raw_analysis' in persona_data:
            st.markdown(persona_data['raw_analysis'])
        else:
            st.text(results['report'])

def display_overview(user_data: dict, persona_data: dict):
    """Display overview metrics and charts."""
    
    profile = user_data['profile']
    posts = user_data['posts']
    comments = user_data['comments']
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Account Age", human_readable_account_age(profile['created_utc']))
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Comment Karma", f"{profile['comment_karma']:,}")
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col3:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Link Karma", f"{profile['link_karma']:,}")
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col4:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Posts Analyzed", len(posts))
        st.markdown('</div>', unsafe_allow_html=True)
    
    # Activity charts
    col1, col2 = st.columns(2)
    
    with col1:
        # Subreddit activity
        if posts:
            subreddit_counts = {}
            for post in posts:
                subreddit = post['subreddit']
                subreddit_counts[subreddit] = subreddit_counts.get(subreddit, 0) + 1
            if subreddit_counts:
                df_subreddits = pd.DataFrame(list(subreddit_counts.items()), columns=['Subreddit', 'Posts'])
                fig = px.bar(df_subreddits.head(10), x='Subreddit', y='Posts', 
                           title="Top Subreddits (Posts)", template="plotly_dark")
                st.plotly_chart(fig, use_container_width=True)
    with col2:
        # Post scores distribution
        if posts:
            scores = [post['score'] for post in posts]
            fig = px.histogram(x=scores, title="Post Score Distribution", 
                             labels={'x': 'Score', 'y': 'Count'}, template="plotly_dark")
            st.plotly_chart(fig, use_container_width=True)

def display_persona_details(persona_data: dict):
    """Display detailed persona information, including summary and person details."""
    # Show summary/overview if present
    if 'raw_analysis' in persona_data:
        import re
        import streamlit as st
        # Extract summary and person details sections from Markdown
        summary = None
        person_details = None
        full_text = persona_data['raw_analysis']
        summary_match = re.search(r'## OVERVIEW / SUMMARY\n(.+?)(?:\n##|$)', full_text, re.DOTALL)
        if summary_match:
            summary = summary_match.group(1).strip()
        person_details_match = re.search(r'## PERSON DETAILS\n(.+?)(?:\n##|$)', full_text, re.DOTALL)
        if person_details_match:
            person_details = person_details_match.group(1).strip()
        if summary:
            st.markdown('### Overview / Summary')
            st.markdown(summary)
        if person_details:
            st.markdown('### Person Details')
            st.markdown(person_details)
    # Show the rest of the persona sections as before
    sections = ['demographics', 'psychology', 'online_behavior', 'expertise', 'social_dynamics']
    section_titles = {
        'demographics': '👥 Demographics',
        'psychology': '🧠 Psychology',
        'online_behavior': '💻 Online Behavior',
        'expertise': '🎯 Expertise',
        'social_dynamics': '🤝 Social Dynamics'
    }
    for section in sections:
        if section in persona_data and persona_data[section]:
            st.markdown(f"### {section_titles[section]}")
            for item in persona_data[section]:
                if isinstance(item, dict):
                    with st.container():
                        col1, col2 = st.columns([3, 1])
                        with col1:
                            st.markdown(f"**{item.get('trait', 'Unknown')}:** {item.get('value', 'Unknown')}")
                            # Render citation as Markdown (hyperlink)
                            citation = item.get('citation', 'No citation provided')
                            if citation.startswith('http'):
                                st.markdown(f"[Citation]({citation})")
                            else:
                                st.caption(f"Citation: {citation}")
                        with col2:
                            confidence = item.get('confidence', 'Unknown')
                            if confidence == 'High':
                                st.success("High")
                            elif confidence == 'Medium':
                                st.warning("Medium")
                            else:
                                st.info("Low")
            st.markdown("---")

def display_activity_analysis(user_data: dict):
    """Display detailed activity analysis."""
    
    posts = user_data['posts']
    comments = user_data['comments']
    
    # Recent activity
    st.subheader("📝 Recent Posts")
    if posts:
        for i, post in enumerate(posts[:5]):
            with st.expander(f"{post['title'][:50]}..."):
                st.write(f"**Subreddit:** r/{post['subreddit']}")
                st.write(f"**Score:** {post['score']}")
                st.write(f"**Comments:** {post['num_comments']}")
                if post['selftext']:
                    st.write(f"**Content:** {post['selftext'][:200]}...")
    
    st.subheader("💬 Recent Comments")
    if comments:
        for i, comment in enumerate(comments[:5]):
            with st.expander(f"Comment in r/{comment['subreddit']}"):
                st.write(f"**Score:** {comment['score']}")
                st.write(f"**Content:** {comment['body'][:200]}...")

def display_quick_stats():
    """Display quick statistics in sidebar."""
    
    if 'analysis_results' in st.session_state:
        results = st.session_state.analysis_results
        user_data = results['user_data']
        
        profile = user_data['profile']
        posts = user_data['posts']
        comments = user_data['comments']
        
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Account Age", human_readable_account_age(profile['created_utc']))
        st.metric("Total Karma", f"{profile['comment_karma'] + profile['link_karma']:,}")
        st.metric("Posts Analyzed", len(posts))
        st.metric("Comments Analyzed", len(comments))
        
        if posts:
            avg_score = sum(post['score'] for post in posts) / len(posts)
            st.metric("Avg Post Score", f"{avg_score:.1f}")
        st.markdown('</div>', unsafe_allow_html=True)

if __name__ == "__main__":
    main() 