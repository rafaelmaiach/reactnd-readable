import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * @constructor PostDescription
 * @param {string} body - Post body
 * @param {boolean} isDetailsPage - Check if the post is being rendered on details page
 */
const PostDescription = ({ body, isDetailsPage }) => {
  let description = '';

  if (isDetailsPage) {
    description = body;
  }

  // Shrink the body to show only 25 words on card
  if (body) {
    const maxBodyWords = 25;
    const validBodyWords = body.split(' ').filter(word => word);
    const bodyHasMoreWords = validBodyWords.length > maxBodyWords;
    const reduceBodySize = bodyHasMoreWords ? validBodyWords.splice(0, 25) : validBodyWords;
    const bodyString = reduceBodySize.join(' ').trim();
    description = bodyHasMoreWords ? `${bodyString}...` : bodyString;
  }

  return (
    <p className="post-description is-size-7-mobile is-size-6">
      {description}
    </p>
  );
};

PostDescription.propTypes = {
  body: PropTypes.string.isRequired,
  isDetailsPage: PropTypes.bool,
};

PostDescription.defaultProps = {
  isDetailsPage: false,
};

const areEqual = (prev, next) =>
  (prev.body === next.body) && (prev.isDetailsPage === next.isDetailsPage);

export default memo(PostDescription, areEqual);
