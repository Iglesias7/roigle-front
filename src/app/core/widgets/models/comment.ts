
  export class Comment {
    id: number;
    body: string;
    timestamp: string;
    userId: number;
    postId: number;
    commentUser: any;

      constructor(data: any) {
        if(data){
          this.id = data.id;
          this.body = data.body;
          this.timestamp = data.timestamp;
          this.userId = data.userId;
          this.postId = data.postId;
          this.commentUser = data.commentUser;
        }
      }
  }



