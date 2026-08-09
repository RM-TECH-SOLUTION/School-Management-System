import { PublicHome } from '@/components/public-home'; export const revalidate=60;
export default async function Home(){
  let content=null;

  try{
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000/api/v1'}/public/homepage`,{next:{revalidate:60}});
    if(r.ok){
      content=await r.json();
      if(content?.body && typeof content.body==='string'){
        try{content.body=JSON.parse(content.body)}catch{}
      }
    }
  }catch{}

  return <PublicHome content={content}/>;
}

