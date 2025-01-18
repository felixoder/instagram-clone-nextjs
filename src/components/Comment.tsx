import { Profile } from "@prisma/client"
import Avatar from "@/components/Avatar";
import { format } from "date-fns";
export default function Comment({
  text,
  authorProfile,
  createdAt
}:{
    text : string
    authorProfile?: Profile
    createdAt: Date
  }){
  return(
 <div className="flex gap-2">
    <div>
      <Avatar src={authorProfile?.avatar || ""} /> 
    </div>
    <div className="w-full">
        <div className="flex gap-2 justify-between">
          <div>
            <h3 className="flex gap-1 dark:text-gray-300">{authorProfile?.name}</h3>
            <h4 className="text-gray-600 dark:text-gray-400 text-sm -mt-1">
              @{authorProfile?.username}
            </h4>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 rounded-md p-4 mt-2 dark:bg-gray-700 dark:border-0 dark:text-gray-400">
            <p>{text}</p>
          </div>
          <div className="text-xs text-gray-400 text-right">
            {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
          </div>
        </div>
    </div>
                   
  </div>

  )
}
