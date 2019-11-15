using System;
using Xunit;
using ComplexServiceLogic.Model;

namespace ComplexServiceTest
{
    public class LogicModelTest
    {
        [Fact]
        public void AmenityTest()
        {
            Amenity amenity = new Amenity
            {
                AmenityId = 1,
                AmenityType = "fridge",
                Description = "to freeze items"
            };

            Assert.Equal(1, amenity.AmenityId);
            Assert.Equal("fridge", amenity.AmenityType);
            Assert.Equal("to freeze items", amenity.Description);
        }

        [Fact]
        public void AmenityComplexTest()
        {
            Guid guid1 = Guid.NewGuid();

            AmenityComplex ac = new AmenityComplex
            {
                AmenityComplexId = 1,
                AmenityId = 1,
                ComplexId = guid1
            };

            Assert.Equal(1, ac.AmenityComplexId);
            Assert.Equal(1, ac.AmenityId);
            Assert.Equal(guid1, ac.ComplexId);
        }

        [Fact]
        public void AmenityRoomTest()
        {
            Guid guid = Guid.NewGuid();

            AmenityRoom ar = new AmenityRoom
            {
                AmenityRoomId = 1,
                AmenityId = 2,
                RoomId = guid
            };

            Assert.Equal(1, ar.AmenityRoomId);
            Assert.Equal(2, ar.AmenityId);
            Assert.Equal(guid, ar.RoomId);
        }

        [Fact]
        public void ComplexTest()
        {
            Guid cId = Guid.NewGuid();
            Guid aId = Guid.NewGuid();
            Guid pId = Guid.NewGuid();

            Complex complex = new Complex
            {
                ComplexId = cId,
                AddressId = aId,
                ProviderId = pId,
                ComplexName = "Liv+",
                ContactNumber = "(123)456-7890"
            };

            Assert.Equal(cId, complex.ComplexId);
            Assert.Equal(aId, complex.AddressId);
            Assert.Equal(pId, complex.ProviderId);
            Assert.Equal("Liv+", complex.ComplexName);
            Assert.Equal("(123)456-7890", complex.ContactNumber);
        }
    }
}
