import React from 'react';
import ExperienceEditorView from './ExperienceEditorView';
import Layout from '../../components/Layout';

const title = 'Experience';
const chunk = '/experienceEditor';

export default {
  path: '/app/:id/experience',
  chunk,
  action() {
    return {
      title,
      chunk,
      component: (
        <Layout>
          <ExperienceEditorView title={title} />
        </Layout>
      ),
      status: 404,
    };
  },
};
