import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
//prettier-ignore
export function useContent() {
  interface Content {
    link: string;
    _id: number;
    title: string;
    type: string;
    contentId: string;
    // Add other properties of the content object here if needed
  }

  const [contents, setContents] = useState<Content[]>([]);

  function refresh() {
    axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
      });
  }
  const deleteContent = async (contentId: string) => { // Changed _id to contentId
    try {
      console.log("Deleting content with ID:", contentId); // Debugging log
    
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: { contentId }, // Send contentId in the request body
      });
    
      setContents((prevContents) => {
        console.log("Previous contents:", prevContents);
        
        // Debug each item to see why the comparison fails
        prevContents.forEach(content => {
          console.log(`Comparing: item.contentId (${content.contentId}) !== contentId (${contentId}): ${content.contentId !== contentId}`);
        });
        
        // Try using string comparison to be safe
        const updatedContents = prevContents.filter(
          (content) => String(content.contentId) !== String(contentId) // Changed _id to contentId
        );
        
        console.log("Updated contents:", updatedContents);
        return updatedContents;
      });
      refresh()
    } catch (error) {
      console.error("Delete error:", error)
    }
  };

  useEffect(() => {
    refresh(); // Initial fetch of content

    const interval = setInterval(() => {
      refresh(); // Periodically refresh content
    }, 10000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  return { contents, refresh,deleteContent };
}
