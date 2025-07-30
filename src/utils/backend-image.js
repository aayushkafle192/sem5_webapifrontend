export const getBackendImageUrl = (filepath) => {
  if (!filepath) return "";

  const cleanPath = filepath.replace(/\\/g, "/");
  const fullPath = `http://localhost:5050/${cleanPath}`;
  console.log("Resolved image path:", fullPath);
  return fullPath;
};
