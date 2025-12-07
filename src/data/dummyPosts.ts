import type { BoardCategory } from "./categories";

export type Post = {
  id: number;
  title: string;
  category: BoardCategory;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  likes: number;
  commentsCount: number;
  thumbnailUrl?: string;
  commentBlocked?: boolean;
  images?: string[]; 
};

export type Comment = {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
};

// 더미 데이터
export const dummyPosts: Post[] = [
  {
      id: 1,
      title: "[공지] 게시판 이용 수칙 안내",
      category: "공지",
      content: "안녕하세요! 쾌적한 커뮤니티 문화를 위해 아래 사항을 꼭 지켜주세요. 욕설/비방 금지, 개인정보 포함 작성 금지, 광고성 글 사전제재",
      author: "작성자1",
      createdAt: "2025-12-05 10:30",
      views: 123,
      likes: 5,
      commentsCount: 2,
      thumbnailUrl: "https://cdn.pixabay.com/photo/2013/07/12/17/44/text-152333_1280.png",
      commentBlocked: false,
  },
  {
      id: 2,
      title: "[필독] 닉네임 정책 변경 안내",
      category: "공지",
      content: "닉네임 변경은 1일 1회 가능하도록 수정됩니다. 부적절한 닉네임 사용시 수정 요청이 있을 수 있습니다.",
      author: "작성자1",
      createdAt: "2025-12-05 10:30",
      views: 123,
      likes: 5,
      commentsCount: 2,
      commentBlocked: false,
  },
  {
      id: 3,
      title: "요즘 일상 루틴 공유해요!",
      category: "자유",
      content: "최근에 운동 시작했는데 확실히 체력이 달라지네요 🏋️ 여러분은 하루 루틴 어떻게 보내세요? 팁 공유 부탁드려요!",
      author: "작성자2",
      createdAt: "2025-12-04 21:15",
      views: 45,
      likes: 10,
      commentsCount: 5,
      commentBlocked: false,
  },
  {
      id: 4,
      title: "우서운 꿈 얘기 해드릴게요",
      category: "공포",
      content: "쓰기에 앞서 음슴체를 쓰겠음. 나는 평소에 꿈을 잘 안꿈. 사람들이 가위눌렸다고 그러면 오히려 신기할정도...",
      author: "작성자3",
      createdAt: "2025-05-03 14:02",
      views: 210,
      likes: 35,
      commentsCount: 10,
  },
  {
      id: 5,
      title: "꿈인지 현실인지 구분이 안 되는 순간…",
      category: "공포",
      content: "잠에서 깼는데 누가 제 이름 부르더라고요. 근데 집에 저 혼자 있었어요. 방금 전까지 바로 옆에서 들렸는데…",
      author: "작성자5",
      createdAt: "2025-10-13 14:02",
      views: 24,
      likes: 34,
      commentsCount: 10,
      thumbnailUrl: "https://media.istockphoto.com/id/1356568194/ko/%EB%B2%A1%ED%84%B0/%EC%B9%A8%EB%8C%80%EC%97%90%EC%84%9C-%EC%95%85%EB%A7%88%EC%99%80-%EC%88%98%EB%A9%B4-%EB%A7%88%EB%B9%84-%EC%95%85%EB%AA%BD-%EA%B3%B5%ED%8F%AC-%EC%9E%A5%EB%A9%B4-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%B2%A1%ED%84%B0.jpg?s=612x612&w=is&k=20&c=UCncJAAQoAgt6_PoeWwj7mX7Bm6lOMs1AijpAh2TZhE=",
  },
  {
      id: 10,
      title: "고양이에게 비밀번호 알려줬더니",
      category: "유머",
      content: "폰에 발바닥 자국이 가득… 틀린 횟수 초과로 잠김 ㅋㅋㅋㅋ",
      author: "작성자3",
      createdAt: "2025-12-03 14:02",
      views: 12,
      likes: 80,
      commentsCount: 10,
      thumbnailUrl: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
      commentBlocked: true,
  },
  {
      id: 6,
      title: "MBTI별로 떠오르는 음식 하나씩 적어보기",
      category: "자유",
      content: "저는 INFJ인데 크림파스타 닮았다는 말 들었어요 🤣 여러분은 어떤 음식이 떠오르나요?",
      author: "작성자2",
      createdAt: "2025-2-03 14:02",
      views: 44,
      likes: 23,
      commentsCount: 10,
      commentBlocked: false,
  },
  {
      id: 7,
      title: "CCTV에 찍힌 낯선 그림자…",
      category: "자유",
      content: "주차장 CCTV 확인했는데 제 차 주변에 검은 형체가 계속 서 있는 장면이 있더라고요. 근데 시간 표시를 보니까… 제가 차에 타고 있었던 시간이에요.",
      author: "작성자3",
      createdAt: "2024-12-03 4:02",
      views: 123,
      likes: 46,
      commentsCount: 10,
      thumbnailUrl: "https://cdn.pixabay.com/photo/2017/12/27/10/14/image-3042333_1280.png",
      commentBlocked: false,
  },
];


export const dummyComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "익명1",
    content: "확인1",
    createdAt: "2025-12-25 10:21",
  },
  {
    id: 2,
    postId: 1,
    author: "익명2",
    content: "확인2",
    createdAt: "2025-11-05 10:30",
  },
  {
    id: 7,
    postId: 7,
    author: "공포매니아",
    content: "흥미롭군요",
    createdAt: "2025-11-05 10:30",
  },
];