"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { getCards } from "@/api/rest";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectedCard from "./selectedCard";
import { translateCardText, type SiteLocale } from "@/lib/i18n/ui";

type CardsProps = {
  open: boolean;
  onCardClose: (open: boolean) => void;
  locale?: SiteLocale;
};

const Cards = ({ open, onCardClose, locale = "mn" }: CardsProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Record<string, any[]>>({});
  const [cardType, setCardType] = useState("ALL");
  const [selectedCard, setSelectedCard] = useState<Record<string, unknown>>({});

  useEffect(() => {
    let active = true;
    setLoading(true);

    getCards()
      .then((response) => {
        if (!active) return;
        const rows: Array<Record<string, any>> = Array.isArray(response?.data)
          ? response.data
          : [];
        const grouped = rows.reduce<Record<string, any[]>>((result, card) => {
          const type = String(card.TYPE ?? "ALL");
          (result[type] ??= []).push(card);
          return result;
        }, {});
        setCards(grouped);
      })
      .catch(() => {
        if (!active) return;
        toast({
          title: isEnglish ? "Cards" : "Карт",
          description: isEnglish
            ? "The available card list could not be loaded."
            : "Боломжит картын жагсаалтыг ачаалж чадсангүй.",
        });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isEnglish, toast]);

  const typeName = (raw: string) => {
    if (raw === "ALL") return isEnglish ? "Standard" : "Энгийн";
    if (raw === "MIP") return "MIP70";
    return isEnglish ? "International" : "Олон улсын";
  };

  return (
    <div>
      {Object.keys(selectedCard).length > 0 ? (
        <SelectedCard
          onCardClose={() => setSelectedCard({})}
          card={selectedCard}
          locale={locale}
        />
      ) : (
        <Dialog open={open} onOpenChange={() => onCardClose(false)}>
          <DialogContent className="max-h-[90%] overflow-y-scroll sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle className="text-brand-1">
                {isEnglish ? "Service cards" : "Карт"}
              </DialogTitle>
            </DialogHeader>
            <RadioGroup
              defaultValue={cardType}
              className="flex justify-center gap-4"
              onValueChange={(value) => setCardType(value.toUpperCase())}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ALL" id="card-standard" />
                <Label htmlFor="card-standard" className="text-[16px]">
                  {isEnglish ? "Standard" : "Энгийн"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="IDD" id="card-international" />
                <Label htmlFor="card-international" className="text-[16px]">
                  {isEnglish ? "International" : "Олон улс"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MIP" id="card-mip" />
                <Label htmlFor="card-mip" className="text-[16px]">
                  MIP70
                </Label>
              </div>
            </RadioGroup>
            <Table>
              <TableCaption>
                {isEnglish ? "Available service cards" : "Боломжит картны жагсаалт"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">
                    {isEnglish ? "Type" : "Төрөл"}
                  </TableHead>
                  <TableHead className="w-[100px]">
                    {isEnglish ? "Price" : "Үнэ"}
                  </TableHead>
                  <TableHead className="w-[100px]">
                    {isEnglish ? "Days" : "Хоног"}
                  </TableHead>
                  <TableHead className="w-[200px]">
                    {isEnglish ? "Description" : "Тайлбар"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(cards[cardType] ?? []).map((card, index) => (
                  <TableRow
                    key={`${card.PREFIX ?? cardType}-${index}`}
                    onClick={() => setSelectedCard(card)}
                    className="cursor-pointer hover:bg-brand-2/20"
                  >
                    <TableCell>{typeName(card.TYPE)}</TableCell>
                    <TableCell className="font-medium">{card.PRICE}₮</TableCell>
                    <TableCell>{card.DAYS}</TableCell>
                    <TableCell>{translateCardText(card.CARD_TYPE, locale)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Cards;
