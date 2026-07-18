import {
  BarChart3,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  CreditCard,
  Dumbbell,
  Globe,
  Heart,
  LogIn,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Settings,
  Shapes,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Trophy,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  BarChart3,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  CreditCard,
  Dumbbell,
  Globe,
  Heart,
  LogIn,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Settings,
  Shapes,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Trophy,
  Users,
  Wallet,
  Zap,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

const DEFAULT_ICON = "Sparkles";

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? ICON_MAP[DEFAULT_ICON];
}
