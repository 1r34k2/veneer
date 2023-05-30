import { cn } from '@/lib/utils'
import {cva} from 'class-variance-authority'
import {Loader2} from 'lucide-react'

const buttonStyles = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-slate-900 text-white hover:bg-slate-800',
                ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200',
            },
            size:{
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2',
                lg: 'h-11 px-8',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    }    
)

const Button = function({className, children, variant, isLoading, size, ...props}){
    return <button className={cn(buttonStyles({variant, size, className}))} {...props} disabled={isLoading} >
            {isLoading ? <Loader2 className='animate-spin mr-2 h-4 w-4'/> : null}
            {children}
           </button>
}

export default Button