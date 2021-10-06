import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
    },
    !currentUser && {
      label: "Sign In",
      href: "/auth/signin",
    },
    currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
    },
  ]
    // gonna filter any entry that is false
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a href="" className="nav-link">
              {label}
            </a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className=" nav d-flex align-items-center">
          {/* {currentUser ? "sign out" : "sign in/up"} */}
          {links}
        </ul>
      </div>
    </nav>
  );
};
