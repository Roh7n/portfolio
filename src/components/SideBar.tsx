import SocialIcon from "./SocialIcon";

export default function Sidebar() {
  return (
    <div className="fixed left-4 top-1/2 flex flex-col space-y-4">
      <SocialIcon
        href="https://github.com/Roh7n"
        src="/github.svg"
        alt="github"
        hoverColor="hover:bg-gray-600"
      />

      <SocialIcon
        href="https://www.linkedin.com/in/rohanbabs4446/"
        src="/linkedin.svg"
        alt="linkedin"
        hoverColor="hover:bg-blue-500"
      />

      <SocialIcon
        href="https://open.spotify.com/user/ijadvlczrnqbc4bikpzcwd118"
        src="/spotify.svg"
        alt="spotify"
        hoverColor="hover:bg-green-500"
      />

      <SocialIcon
        href="https://www.instagram.com/rroh7n/"
        src="/instagram.svg"
        alt="instagram"
        hoverColor="hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600"
      />
    </div>
  );
}
