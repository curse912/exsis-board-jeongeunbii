export type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  likes: number;
  commentsCount: number;
  thumbnailUrl?: string;
  commentBlocked?: boolean;
//   images?: string[]; 
};

export type Comment = {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
  parentId?: number; 
};

// 더미 데이터
export const dummyPosts: Post[] = [
    {
        id: 1,
        title: "공지 게시글",
        category: "공지",
        content: "공지 게시글 내용",
        author: "작성자1",
        createdAt: "2025-12-05 10:30",
        views: 123,
        likes: 5,
        commentsCount: 2,
        thumbnailUrl: "https://via.placeholder.com/80x80",
        commentBlocked: false,
        // images: [], 
    },
    {
        id: 2,
        title: "자유 게시글",
        category: "자유",
        content: "자유 게시글 내용",
        author: "작성자2",
        createdAt: "2025-12-04 21:15",
        views: 45,
        likes: 10,
        commentsCount: 5,
        commentBlocked: true,
        // images: [],
    },
    {
        id: 3,
        title: "공포 게시글",
        category: "공포",
        content: "공포 게시글 내용",
        author: "작성자3",
        createdAt: "2025-12-03 14:02",
        views: 210,
        likes: 35,
        commentsCount: 10,
        thumbnailUrl: "https://via.placeholder.com/80x80",
    },
];


export const dummyComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "익명1",
    content: "확인1",
    createdAt: "2025-12-05 10:21",
  },
  {
    id: 2,
    postId: 1,
    author: "익명2",
    content: "확인2",
    createdAt: "2025-12-05 10:30",
    parentId: 1,
  },
];