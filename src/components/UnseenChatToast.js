
const UnseenChatToast = function({t,senderId,receiverId, senderName, message}){
  return <div className={cn('max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5',
  {'animate-enter':t.visible,
  'animate-leave':!t.visible
    })}>
        <a className="flex-1 w-0 p-4" 
        onClick={()=> toast.dismiss(t.id)} href={`/dashboard/chat/${chatHrefConstructor(senderId,receiverId)}`}>
            <div className='flex items-start'>
                <div className='flex-shrink-0 pt-0.5'>
                    <div className='relative h-9 w-9'>
                    <Image
                        width={300}
                        height={400}
                        className=" w-9 h-12"
                        referrerPolicy="no-referrer"
                        src={imgUrl}
                    />
                    </div>
                </div>

                <div className="ml-3 flex-1">
                    <p className='text-sm font-medium text-gray-900'>{senderName}</p>
                    <p className='mt-1 text-sm text-gray-500'>{message}</p>
                </div>
            </div>
        </a>
  </div> 
}

export default UnseenCHatToast