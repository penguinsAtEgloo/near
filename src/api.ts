export const GET_IMAGES = async (CUID: string) => {
  //   const response = await fetch(`http://localhost:3000/v1/images/${CUID}/`, {
  const response = await fetch(`https://egloo.com/i/${CUID}/`, {
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return await response;
};

export const POST_IMAGES = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  //   return await fetch(`http://localhost:3000/v1/images`, {
  return await fetch(`https://egloo.com/i/images`, {
    method: 'POST',
    headers: {},
    body: formData, // content: content
  });
};
