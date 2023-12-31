import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import NavToday from "./NavToday"
import { NavDate } from "./NavDate"
import NavWeather from "./NavWeather"
import { Weather } from "@/types/type"
import { Link } from "react-router-dom"

interface NavigationProps {
  weatherData?: Weather
  Icon?: string
}

const Navigation: React.FC<NavigationProps> = ({ weatherData, Icon }) => {

  return (
    <NavigationMenu>
      <NavigationMenuList >
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-violet-500 dark:bg-zinc-800 cursor-default dark:hover:bg-zinc-900">Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="bg-violet-900 dark:bg-zinc-800  fixed rounded-2xl shadow-xl  right-[5px] grid gap-3 p-1 md:w-[400px] drop-shadow-md lg:w-[510px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <div className="flex h-full w-full select-none flex-col justify-end rounded-md dark:bg-zinc-900 bg-violet-600 shadow-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                  <NavWeather weatherData={weatherData} Icon={Icon} />
                </div>
              </li>
              <Link className="shadow-md" to="/" title="Todo">
                <ListItem>
                  나의 할일을 메모합니다.
                </ListItem>
              </Link>
              <Link className="shadow-md" to="/favor" title="즐겨찾기">
                <ListItem>
                  나의 즐겨찾기
                </ListItem>
              </Link>
              <div className="flex flex-col gap-2 pb-2">
                <NavToday />
                <NavDate />
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline group outline-none transition-colors hover:bg-violet-600 dark:hover:bg-zinc-900 hover:text-white focus:bg-violet-600 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white ">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white text-muted-foreground ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Navigation