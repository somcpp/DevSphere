import React from "react";
import ItemsCard from "./ItemsCard";

/**
 * ItemsList — renders a grid of ItemsCard components.
 *
 * Props:
 *  - items  : array of { user, requestId } objects
 *  - mode   : "myConnections" | "incoming" | "outgoing"
 *  - emptyMessage : string shown when no items
 */
const ItemsList = ({ items = [], mode, emptyMessage = "Nothing here yet." }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">🤝</div>
        <p className="text-gray-500 text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item, idx) => (
        <ItemsCard
          key={item.requestId || idx}
          user={item.user}
          requestId={item.requestId}
          mode={mode}
        />
      ))}
    </div>
  );
};

export default ItemsList;