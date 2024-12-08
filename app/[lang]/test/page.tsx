export default function TestPage({ params }: { params: { lang: string } }) {
  console.log("TestPage Loaded. Params:", params);
  return <div>Test Page for Language: {params.lang}</div>;
}
