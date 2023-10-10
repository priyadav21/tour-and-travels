/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import { fetchWebsitePostList } from '../actions';

const ArticleListPage = props => {
  const [currentArticle, setCurrentArticle] = useState({});

  const readArticle = article => {
    setCurrentArticle(article);
  };

  const renderArticles = () => {
    return props.articles.map(article => (
      <div key={Math.random()} className="col s12 m6 l6 xl4" key={article.title}>
        <div className="card large">
          <div className="card-image">
            <LazyLoadImage alt={article.title} src={article.urlToImage} />
          </div>
          <div className="card-content">
            <span className="card-title">{article.title}</span>
          </div>
          <div className="card-action">
            <a href="javascript:void(0)" onClick={() => readArticle(article)}>
              Read More
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const { articles, location, match } = props;

  const metaTitle = 'Login for Great B2B Deals : Touroxy';
  const metaDesc = '';
  const keyword = '';

  const category = props && articles[0] && articles[0].title;

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>{`${category} Articles`}</title>
        <meta property="og:title" content={`${category} Articles List`} />
        <meta
          name="description"
          content={`Latest ${category} articles, popular articles from most popular news websites of the world`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://touroxy.com${location.pathname}`} />
      </Helmet>
    );
  };

  const { fetchWebsitePostList: loadArticles } = props;

useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      loadArticles(match.params.id);
    } else {
      loadArticles();
    }
  }, [loadArticles, match.params.id]);
  return (
     <div>
      {MetaTags.getAppMetaTags(seoDetail)}
      {/* {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null} */}
      <div className="row">
        <div className="section">
          <h3>{category}</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <div className="row">{renderArticles()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state.articles);
  return {
    articles: state.articles
  };
};

const loadData = (store, param) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchWebsitePostList(param)); // Manually dispatch a network request
};

ArticleListPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  fetchWebsitePostList: PropTypes.func
};

ArticleListPage.defaultProps = {
  articles: [],
  location: null,
  match: null,
  fetchWebsitePostList: null
};

export default {
  component: connect(mapStateToProps, { fetchWebsitePostList })(ArticleListPage),
  loadData
};
