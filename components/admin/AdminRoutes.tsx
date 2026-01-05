'use client';

import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function AdminHome() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-white/80 mt-2">Use the controls on Flows / Flow pages to edit content.</p>
    </div>
  );
}

/**
 * Admin routes are intentionally simple; the primary admin UX lives
 * inline on the existing pages (Flows + FlowDetail) and is lazy-loaded.
 */
export default function AdminRoutes() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/admin" exact={true} render={() => <AdminHome />} />
        <Route render={() => <Redirect to="/admin" />} />
      </Switch>
    </Suspense>
  );
}

