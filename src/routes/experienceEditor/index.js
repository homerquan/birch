import React from 'react';
import ExperienceEditorView from './ExperienceEditorView';
import Layout from '../../components/Layout';

const title = 'Experience Editor';

export default {
  path: '/:id/experience_editor',
  chunk: '/experienceEditor',
  action() {
    return {
      title,
      chunk: 'experienceEditor',
      component: (
        <Layout>
          <ExperienceEditorView title={title} />
        </Layout>
      ),
      status: 404,
    };
  },
};
