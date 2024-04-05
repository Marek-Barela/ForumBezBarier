import { PlusCircle, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Post
                </span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </main>
      </div>
    </div>
  );
}

const Post = () => {
  return (
    <div className="w-full mx-auto bg-white shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
            <div className="text-sm text-gray-600">u/nazwa_użytkownika</div>
          </div>
          <div className="ml-auto text-xs text-gray-500">7h ago</div>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Tytuł posta</h2>
        <p className="text-sm text-gray-600">Treść posta...</p>
      </div>
      <div className="bg-gray-50 px-4 py-2 flex">
        {/* <button className="text-gray-500 hover:text-gray-600 mr-2 flex items-center">
          <ThumbsUp className="h-6 w-6" />
          <span>1</span>
        </button>
        <button className="text-gray-500 hover:text-gray-600 flex items-center">
          <ThumbsDown className="h-6 w-6" />
        </button> */}
        <span className="ml-auto text-gray-500 hover:text-gray-600 cursor-pointer flex items-center">
          <MessageSquare className="h-6 w-6" />
          <span>0 komentarzy</span>
        </span>
      </div>
    </div>
  );
};
