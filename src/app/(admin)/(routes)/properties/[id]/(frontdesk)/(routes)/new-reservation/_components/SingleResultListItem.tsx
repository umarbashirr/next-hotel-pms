"use client";

import { Mail, MapPinIcon, Phone } from "lucide-react";
import React from "react";

const SingleResultListItem = () => {
  return (
    <li>
      <div className="border rounded-lg p-4">
        <h4 className="text-lg font-semibold">
          Company Name here{" "}
          <span className="text-sm font-medium ml-1">(CTD 001)</span>
        </h4>
        <ul className="flex items-center justify-start mt-2 flex-wrap gap-x-4 gap-y-2">
          <li className="flex items-center justify-start gap-2">
            <Phone size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">+91 123 456 7890</p>
          </li>
          <li className="flex items-center justify-start gap-2">
            <Mail size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              umarbashir@gmail.com
            </p>
          </li>
          <li className="flex items-center justify-start gap-2">
            <MapPinIcon size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Delhi, India</p>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default SingleResultListItem;
