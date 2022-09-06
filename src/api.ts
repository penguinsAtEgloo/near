export const postImages = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  //   return await fetch(`http://localhost:3000/v1/images`, {
  return await fetch(
    `http://shiny-near-dev-service-alb-937353192.ap-northeast-2.elb.amazonaws.com/v1/images`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData, // content: content
    }
  );
};

export const getImages = async (CUID: string) => {
  //   const response = await fetch(`http://localhost:3000/v1/images/${CUID}/`, {
  // const response = await fetch(`https://egloo.com/i/${CUID}/`, {
  const response = await fetch(
    `http://shiny-near-dev-service-alb-937353192.ap-northeast-2.elb.amazonaws.com/v1/images/${CUID}`,
    {
      method: 'POST',
      headers: {},
    }
  );
  return await response;
};
