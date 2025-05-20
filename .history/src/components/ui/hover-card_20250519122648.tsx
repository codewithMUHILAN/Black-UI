import React from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const HoverCardDemo = () => {
  return (
    <div className="h-40">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@Codewith_muhilan</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@Codewith_muhilan</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @@Codewith_muhilan.
              </p>
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default HoverCardDemo;
