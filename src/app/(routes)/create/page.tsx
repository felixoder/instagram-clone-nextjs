"use client";
import { postEntry } from "@/components/actions";
import { TextArea, Button } from "@radix-ui/themes";
import { CloudUploadIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState('');
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  console.log(imageUrl)
  
  useEffect(()=>{
    if(!file) return;
    setIsUploading(true);
     const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(response =>{
         response.json().then(url=>{
          setImageUrl(url);
          setIsUploading(false);
        })
      })
  },[file])


  return(
  <form
      className="max-w-md mx-auto"
      action={async(data)=>{
    const id = await postEntry(data);
    router.push(`/posts/${id}`);
    router.refresh();

    }}>
      <input type="hidden" name="image" value={imageUrl}/>
      <div className="flex flex-col gap-4">
        <div>
          
          <div className=" p-2 min-h-64 bg-gray-400 rounded-md relative">
            {imageUrl && (
            <img src={imageUrl} className="rounded-md" alt="image" />
            )}
            <div className="absolute inset-0 flex justify-center items-center" >
               <input 
                type="file"
                className="hidden"
                ref={fileInRef}
                onChange={ev => setFile(ev.target.files?.[0] || null)}
              />
              <Button
                disabled={isUploading}
                type="button" 
                variant="surface"
                onClick={()=> fileInRef?.current?.click()}
              >
                {!isUploading && (
                    <CloudUploadIcon size={16} />
                )}
                {isUploading ? 'Uploading...' : 'Choose Image'}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextArea name="description" className="h-16" placeholder="Add photo description..." /> 
        </div> 
      </div>
      <div className="flex mt-4 justify-center">
        <Button type="submit">
          <SendIcon size={16} />
          Publish
        </Button>
      </div>
  </form>
  )
}
