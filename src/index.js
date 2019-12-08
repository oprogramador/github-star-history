import countStars from 'github-stars/countStars';
import fetchPage from 'github-stars/fetchPage';

export default (date, name) => countStars(date, name, fetchPage);
