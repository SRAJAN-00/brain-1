import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import toast from 'react-hot-toast';

export function useContent() {
  interface Content {
    link: string;
    _id: number;
    title: string;
    type: string;
    contentId: string;
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

  const deleteContent = async (contentId: string) => {
    try {
      console.log("Deleting content with ID:", contentId);
    
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: { contentId },
      });
    
      setContents((prevContents) => {
        const updatedContents = prevContents.filter(
          (content) => String(content.contentId) !== String(contentId)
        );
        return updatedContents;
      });
      
      // Show success toast
      toast.success('Content deleted successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: 'white',
        },
      });
      
      refresh();
    } catch (error) {
      console.error("Delete error:", error);
      
      // Show error toast
      toast.error('Failed to delete content', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: 'white',
        },
      });
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh, deleteContent };
}
