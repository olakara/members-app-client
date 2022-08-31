/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
function HeaderLogoComponent() {
  return (
    <>
      <a href="/home" alt="home">
        <img className="h-8 w-auto" src="/images/logo.jpg" alt="Logo" />
      </a>
    </>
  );
}

export default HeaderLogoComponent;
