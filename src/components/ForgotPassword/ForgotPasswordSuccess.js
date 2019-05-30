import * as React from 'react';

import Link from '../styled/Link';

export default () => (
  <div>
    <h2>Forgot Password</h2>
    <p>The link to reset your password has been sent to: xxxx@zzz.com.</p>
    <Link href="/login">
      Return to login page
    </Link>
  </div>
);
