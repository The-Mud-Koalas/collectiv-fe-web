import React, { forwardRef, useId, useState } from "react";
import { inter } from "@/utils/constants/fonts";
import cn from "clsx";
import TextareaAutosize from "react-textarea-autosize";
import { postRequest } from "@/lib/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/context/AppContext";

interface Props {
  eventDetails: EventDetail;
}

const ForumInput = forwardRef<HTMLDivElement, Props>(
  function ForumInput({ eventDetails }: Props, ref) {
    const id = useId();
    const { user } = useAppContext();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();
    const uploadPost = useMutation({
      mutationFn: async () => {
        if (!user) return;
        const token = await user.getIdToken();
        await postRequest({
          token,
          endpoint: `/forums/${eventDetails.id}/post`,
          body: { content, is_anonymous: isAnonymous },
        });
      },
      onSuccess: async () => {
        setContent("");
        queryClient.fetchInfiniteQuery({ queryKey: ["new-posts", eventDetails.id] });
      },
    });

    return (
      <div
        ref={ref}
        className="w-full border border-gray-400 rounded-md p-6 bg-white flex flex-col justify-center"
      >
        <TextareaAutosize
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          minRows={4}
          placeholder="What's on your mind about this event?"
          className={cn(
            "w-full resize-none rounded-md placeholder-shown:italic focus:outline-none lg:text-base text-sm",
            inter.className
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="checkbox"
              checked={isAnonymous}
              className="lg:w-4 lg:h-4 h-3 w-3"
              onChange={(e) => setIsAnonymous(e.currentTarget.checked)}
            />
            <label
              htmlFor={id}
              className={cn(
                "text-gray-400 font-medium lg:text-sm text-xs",
                inter.className
              )}
            >
              Post as anonymous
            </label>
          </div>
          <button
            onClick={() => uploadPost.mutate()}
            disabled={content.trim().length === 0 || uploadPost.isLoading}
            className="text-sm lg:text-base px-8 py-1 rounded-3xl font-medium bg-primary-800 text-primary-300 disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    );
  }
);

export default ForumInput;
