type UserType = "User" | "Organization" | string;
// type UserType = "User" | "Organization";

interface UsersOrgs {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;

  //   login: "toml-lang",
  // id: 7966854,
  // node_id: "MDEyOk9yZ2FuaXphdGlvbjc5NjY4NTQ=",
  // url: "https://api.github.com/orgs/toml-lang",
  // repos_url: "https://api.github.com/orgs/toml-lang/repos",
  // events_url: "https://api.github.com/orgs/toml-lang/events",
  // hooks_url: "https://api.github.com/orgs/toml-lang/hooks",
  // issues_url: "https://api.github.com/orgs/toml-lang/issues",
  // members_url: "https://api.github.com/orgs/toml-lang/members{/member}",
  // public_members_url: "https://api.github.com/orgs/toml-lang/public_members{/member}",
  // avatar_url: "https://avatars.githubusercontent.com/u/7966854?v=4",
  // description: "Tom's Obvious, Minimal Language (and friends)"
}

interface UserModel {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: UserType;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
interface UsersArrayModel {
  usersArray: UserModel[];
}
