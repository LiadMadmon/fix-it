type FixSeverity = 'urgent' | 'can-wait';
type FixType = 'keyboard' | 'mouse' | 'screen';

export type FixRequest = {
  name: string;
  floor: string;
  location: string;
  severity: FixSeverity;
  type: FixType;
}
