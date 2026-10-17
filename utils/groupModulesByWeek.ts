import { WeekGroup } from "@/app/(marketing)/courses/[slug]/page";
import { IModuleBrief } from "@/services/graphql";

export function groupModulesByWeek(modules?: IModuleBrief[]): WeekGroup[] {
  if (!modules?.length) return [];

 

  const byWeek = new Map<number, IModuleBrief[]>();

  [...modules]
    .sort(
      (a, b) =>
        (a.weekNumber ?? 0) - (b.weekNumber ?? 0) ||
        (a.serial ?? 0) - (b.serial ?? 0),
    )
    .forEach((module) => {
      const week = module.weekNumber ?? 1;
      const list = byWeek.get(week) ?? [];
      list.push(module);
      byWeek.set(week, list);
    });

  return [...byWeek.entries()].map(([week, modules]) => ({ week, modules }));
}