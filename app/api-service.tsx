const root = `${process.env.BACKEND_SERVICE_URL}/api/v1`;

export async function getGeneratedCoverLetter() {
  return (await fetch(root + "/cover-letters")).json();
}
