import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import s from './style.css';

const profileInputStyle = {
  display: 'block',
  margin: 0,
};

const uploadBtn = {
  display: 'block',
  marginTop: '10px',
};

const saveBtn = {
  marginTop: '20px',
};

const Account = () => (
  <div className={s.container}>
    <div>
      <h3 className={s.sectionTitle}>Profile</h3>
    </div>
    <div>
      <div className={s.profile}>
        <div className={s.imgUpload}>
          <Avatar
            src="images/avatar-visitor.png"
            size={80}
          />
          <Button variant="contained" label="Upload Image" style={uploadBtn} />
        </div>
        <div>
          <TextField
            style={profileInputStyle}
            hintText="name@gmail.com"
            floatingLabelText="Email Address"
          />
          <TextField
            style={profileInputStyle}
            hintText="Bob"
            floatingLabelText="Name"
          />
        </div>
      </div>
      <Button variant="contained" label="Save" primary style={saveBtn} />
    </div>

    <div className={s.divider}>
      <Divider />
    </div>

    <div>
      <h3 className={s.sectionTitle}>Password</h3>
    </div>
    <div>
      <TextField
        style={profileInputStyle}
        type="password"
        floatingLabelText="Current Password"
      />
      <TextField
        style={profileInputStyle}
        type="password"
        floatingLabelText="New Password"
      />
      <p className={s.helperText}>Password must be 8 or more characters.</p>
      <TextField
        style={profileInputStyle}
        type="password"
        floatingLabelText="Confirm New Password"
      />
      <Button variant="contained" label="Update Password" primary disabled style={saveBtn} />
    </div>

    <div className={s.divider}>
      <Divider />
    </div>

    <div>
      <h3 className={s.sectionTitle}>Close Account</h3>
    </div>
    <div>
      <Button variant="contained" label="close this account" secondary />
    </div>
  </div>
);

export default withStyles(s)(Account);

