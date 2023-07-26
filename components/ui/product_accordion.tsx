"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import Utils from "../../utils/utils";
import { Pause, Play, Trash2 } from "lucide-react";
import Image from "next/image";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { useProductAccordionStore } from "../../data/stores/product_accordion_store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./butto";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import EditProductForm from "./edit_product_form";
import Loader from "./loader";
import ProductAccordionSkeleton from "./product_accordion_skeleton";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ProductAccordion() {
  const {
    products,
    init,
    isLoading,
    changeProductStatus,
    statusLoaders,
    onStatusChange,
    selectedStatus,
    deleteProduct,
  } = useProductAccordionStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="w-full md:w-[75%] mx-auto pr-4 h-[60vh] overflow-y-auto">
      <Tabs
        defaultValue="ALL"
        className="w-full"
        onValueChange={onStatusChange}
      >
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="RUNNING">Running</TabsTrigger>
          <TabsTrigger value="PAUSED">Paused</TabsTrigger>
        </TabsList>
        <TabsContent value={selectedStatus}>
          {isLoading ? (
            <ProductAccordionSkeleton />
          ) : (
            <Accordion type="single" collapsible>
             
             
            </Accordion>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
