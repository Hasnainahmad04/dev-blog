import PostCard, { Tag } from "@/components/PostCard";
import { blog, tags } from "@/data";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-2/3 divide-y p-4 lg:mx-20 my-8">
        {Array.from({ length: 20 }).map((item, index) => {
          return <PostCard blog={blog} key={blog.id} />;
        })}
      </div>
      <div className="hidden lg:block w-1/3 border-l border-gray-300">
        <div className="w-full p-4">
          <h3 className="text-black font-medium">Recommended topics</h3>
          <div className="flex-wrap flex gap-3 my-2 w-4/5">
            <TagsList tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const TagsList = ({ tags }: { tags: string[] }) => {
  return tags.map((tag) => {
    return (
      <Tag className="px-4 py-2 font-medium text-black/80" key={tag}>
        {tag}
      </Tag>
    );
  });
};
