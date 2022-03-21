namespace EverybodyCodes.Api.Enums
{
    [Flags]
    public enum DivisibleByFlag
    {
        None = 0,
        Three = 1,
        Five = 2,
        ThreeAndFive = Three | Five
    }
}
