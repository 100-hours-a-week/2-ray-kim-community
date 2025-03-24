const Comment = (comment) => {
  const profileImage = comment.author.profile_image ?? 'public/images/avatar.svg'

  return `
    <div class="postpage-comment-item">
      <div class="postpage-user-avatar" style="background-image: url(${profileImage})"></div>
      <div class="postpage-comment-content">
        <div class="postpage-comment-author">${comment.author.nickname}</div>
        <div class="postpage-comment-text">${comment.content}</div>
        <div class="postpage-comment-meta">${comment.date}</div>
      </div>
    </div>
  `
}

export default Comment;