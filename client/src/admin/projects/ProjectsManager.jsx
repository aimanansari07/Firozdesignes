import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi.js';
import projectService from '../../services/projectService.js';
import ProjectsList from './ProjectsList.jsx';

export default function ProjectsManager() {
  const { data, loading, error, refetch } = useApi(() => projectService.adminList(), []);
  const projects = data?.data || [];

  const onTogglePublish = async (p) => {
    try {
      await projectService.togglePublish(p._id);
      toast.success(p.published ? 'Unpublished' : 'Published');
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  const onDelete = async (p) => {
    if (!window.confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
    try {
      await projectService.remove(p._id);
      toast.success('Project deleted');
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-light text-white">Projects</h1>
        <Link to="/admin/projects/new" className="flex items-center gap-2 bg-gold px-4 py-2 font-body text-small text-bg transition hover:bg-gold-light">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {loading ? (
        <div className="h-40 animate-pulse border border-border bg-surface" />
      ) : error ? (
        <p className="border border-automotive/40 bg-automotive/10 px-4 py-3 font-body text-small text-automotive">
          Could not load projects. {error}
        </p>
      ) : (
        <ProjectsList projects={projects} onTogglePublish={onTogglePublish} onDelete={onDelete} />
      )}
    </div>
  );
}
