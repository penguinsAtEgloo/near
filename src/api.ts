export const GET_IMAGES = async (CUID: string) => {
  //   const response = await fetch(`http://localhost:3000/v1/images/${CUID}/`, {
  const response = await fetch(`https://egloo.com/i/${CUID}/`, {
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return await response;
};
