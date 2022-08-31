/* eslint-disable @next/next/no-html-link-for-pages */
function AddButtonComponent(props) {
  const { children, action } = props;
  return (
    <a
      href={action}
      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      {children}
    </a>
  );
}

export default AddButtonComponent;
