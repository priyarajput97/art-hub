import Link from "next/link";
import IconBookmark from "../icon-components/IconBookmark";
import IconComment from "../icon-components/IconComment";
import IconHeart from "../icon-components/IconHeart";

const src =
  "https://images.unsplash.com/photo-1611149916119-c6c16eb89f89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80";

const PostsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((post) => (
        <Link href={`post/${post}`}>
          <div className="relative group">
            <img
              src={src}
              className="aspect-square object-center object-cover group-hover:brightness-50 transition"
            />
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex invisible group-hover:visible gap-x-4">
              <div className="flex flex-col items-center text-white">
                <IconHeart /> 90
              </div>
              <div className="flex flex-col items-center text-white">
                <IconComment /> 2
              </div>
              <div className="flex flex-col items-center text-white">
                <IconBookmark /> 8
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsGrid;
