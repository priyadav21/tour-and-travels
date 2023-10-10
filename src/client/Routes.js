import NotFoundPage from './pages/NotFoundPage';
import ArticleListPage from './pages/ArticleListPage';
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import AgentSignUpPage from './pages/agentSignUpPage';
import AgentLoginPage from './pages/agentLoginPage';
import TourList from './pages/TourList';
import TourDetail from './pages/TourDetail';
import contactUs from './pages/contactUs';
export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        path: '/packages/:title',
        ...TourDetail,
        title: 'packages-param'
      },
      {
        path: '/tour-package/:title',
        ...TourList,
        title: 'tour-package-param'
      },
      {
        path: '/tour-package',
        ...TourList,
        title: 'tour-package'
      },
      {
        path: '/packages/:id',
        ...ArticleListPage
      },
      {
        path: '/tour-package/:id',
        ...ArticleListPage
      },
      {
        path: '/login',
        ...LoginPage
      },
      {
        path: '/register',
        ...SignUpPage
      },
      {
        path: '/agent-register',
        ...AgentSignUpPage
      },
      {
        path: '/agent-login',
        ...AgentLoginPage
      },
      
      {
        path: '/travel-guide',
        ...ArticleListPage
      },
      {
        path: '/contact-us',
        ...contactUs
      },
      /* {
        path: 'privacy-policy',
        ...PrivacyPolicyPage
      }, */
      {
        ...NotFoundPage
      }
    ]
  }
];
