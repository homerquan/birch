import * as React from 'react';

import Link from '../styled/Link';

export default () => (
  <div>
    <h2>Reset Password</h2>
    <p>Your password has changed. Please login again.</p>
    <Link to="/login">
      Return to login page
    </Link>
  </div>
);
