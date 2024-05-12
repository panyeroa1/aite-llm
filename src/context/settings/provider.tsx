"use client";
import { OpenAISettings } from "@/components/settings/openai";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useChatContext } from "../chat/context";
import { SettingsContext } from "./context";

export type TSettingsProvider = {
  children: React.ReactNode;
};

export type TSettingMenuItem = {
  name: string;
  key: string;
  component: React.ReactNode;
};
export const SettingsProvider = ({ children }: TSettingsProvider) => {
  const { sessions, createSession } = useChatContext();
  const router = useRouter();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("profile");

  const open = () => setIsSettingOpen(true);

  const dismiss = () => setIsSettingOpen(false);

  const settingMenu: TSettingMenuItem[] = [
    {
      name: "Profile",
      key: "profile",
      component: <div>Profile</div>,
    },
    {
      name: "Prompts",
      key: "prompts",
      component: <div>Prompts</div>,
    },
    {
      name: "Roles",
      key: "roles",
      component: <div>Roles</div>,
    },
  ];

  const modelsMenu: TSettingMenuItem[] = [
    {
      name: "OpenAI",
      key: "open-ai",
      component: <OpenAISettings />,
    },
    {
      name: "Anthropic",
      key: "anthropic",
      component: <div>Anthropic</div>,
    },
    {
      name: "Gemini",
      key: "gemini",
      component: <div>Gemini</div>,
    },
  ];

  const allMenus = [...settingMenu, ...modelsMenu];

  const selectedMenuItem = allMenus.find((menu) => menu.key === selectedMenu);

  return (
    <SettingsContext.Provider value={{ open, dismiss }}>
      {children}

      <Dialog open={isSettingOpen} onOpenChange={setIsSettingOpen}>
        <DialogContent className="min-w-[800px] min-h-[80vh] flex flex-row overflow-hidden border border-white/5 p-0">
          <div className="w-[250px] bg-black/10 p-2 absolute left-0 top-0 bottom-0 flex flex-col">
            <p className="px-4 py-2 text-xs font-semibold text-white/30">
              GENERAL
            </p>
            {settingMenu.map((menu) => (
              <Button
                variant={selectedMenu === menu.key ? "secondary" : "ghost"}
                key={menu.key}
                onClick={() => setSelectedMenu(menu.key)}
                className="justify-start"
                size="default"
              >
                {menu.name}
              </Button>
            ))}
            <p className="px-4 py-2 text-xs font-semibold text-white/30">
              MODELS
            </p>
            {modelsMenu.map((menu) => (
              <Button
                variant={selectedMenu === menu.key ? "secondary" : "ghost"}
                key={menu.key}
                onClick={() => setSelectedMenu(menu.key)}
                className="justify-start"
                size="default"
              >
                {menu.name}
              </Button>
            ))}
          </div>
          <div className="ml-[250px] w-full h-full">
            {selectedMenuItem?.component}
          </div>
        </DialogContent>
      </Dialog>
    </SettingsContext.Provider>
  );
};