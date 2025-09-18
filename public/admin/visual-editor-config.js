// Placeholder config for visual editor to prevent 404 errors in dev.
// Export the symbols expected by the app so imports won't fail.

export const POPUP_STYLES = {
  container: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4',
  panel: 'bg-white rounded-xl shadow-xl w-full max-w-lg p-6',
};

export const VISUAL_EDITOR_ENABLED = false;

export default {
  POPUP_STYLES,
  VISUAL_EDITOR_ENABLED,
};

// eslint-disable-next-line no-console
console.debug('visual-editor-config loaded (placeholder)');


