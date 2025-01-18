'use client';
import { TextField, TextArea, Button, Switch } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { updateProfile } from "./actions";
import {useRouter} from "next/navigation";
import {Profile} from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({
   profile
    }:{
    profile: Profile | null,
    })
    {
    const router = useRouter();
    const fileInRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>();
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
    const [isUploading, setIsUploading] = useState(false);
    useEffect(()=>{
    if(!file) return
    setIsUploading(true)
     const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(response =>{
         response.json().then(url=>{
          setAvatarUrl(url);
          setIsUploading(false)
        })
      })

  },[file])
    return(

      <form action={async (data: FormData)=>{
        await updateProfile(data);
        router.push('/profile');
        router.refresh();
        }}
      >
        <input type="hidden" name="avatar" value={avatarUrl || ''} />
        <div className="flex gap-4 items-center">
          <div>
            <div className="bg-gray-400 size-24 rounded-full">
            <img src={avatarUrl || ''} className="rounded-full size-24 overflow-hidden aspect-square shadow-md shadow-gray-400" alt="" />
            </div>

          </div>
          <div>
          <input 
            type="file" 
            ref={fileInRef} 
            className="hidden"
            onChange={ev => setFile(ev.target.files?.[0])}
          />
            <Button variant="surface"
            disabled={isUploading}
            type="button"
            onClick={()=> fileInRef.current?.click()}
          >
             {!isUploading && (
                    <CloudUploadIcon size={16} />
                )}
                {isUploading ? 'Uploading...' : 'Choose Avatar'}
            </Button>
          </div>
        </div>
        <p className="mt-2 font-bold">username</p>
       <TextField.Root
          placeholder="your_username"
          name="username"
            defaultValue={profile?.username || ''}
        />
        <p className="mt-2 font-bold">name</p>
       <TextField.Root
          placeholder="John Doe"
          name="name"
                defaultValue={profile?.name || ''}
        />
        <p className="mt-2 font-bold">subtitle</p>
      <TextField.Root
          placeholder="Graphic Designer"
          name="subtitle"
                defaultValue={profile?.subtitle || ''}
        />
        <p className="mt-2 font-bold">bio</p>
      <TextArea 
            name="bio" 
            defaultValue={profile?.bio || ''}
            />
      <label className="flex gap-2 items-center mt-2">
        <span>Dark mode</span>
      <Switch
          defaultChecked={localStorage.getItem('theme') == 'dark'}
          onCheckedChange={(isDark)=>{
          const html = document.querySelector('html');
          const theme = isDark ? 'dark' : 'light';
          if(html){
            html.dataset.theme =  theme;         }
          localStorage.setItem('theme',theme)
          window.location.reload();
        }} />
      </label>
        <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
        </div>
      </form>

    )
}
