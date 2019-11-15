﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Revature.Room.DataAccess.Entities;

namespace Revature.Room.DataAccess.Migrations
{
    [DbContext(typeof(RoomServiceContext))]
    [Migration("20191115164121_Reinitialize")]
    partial class Reinitialize
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Revature.Room.DataAccess.Entities.Gender", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Gender");

                    b.HasData(
                        new
                        {
                            Id = new Guid("01743da3-37c2-47f5-b545-9abcea22f7a3"),
                            Type = "Male"
                        },
                        new
                        {
                            Id = new Guid("7f390145-656c-4e2b-82d7-68ec80467ed9"),
                            Type = "Female"
                        },
                        new
                        {
                            Id = new Guid("e805c884-07c9-475d-9384-a67da9a3d1f6"),
                            Type = "Nonbinary"
                        });
                });

            modelBuilder.Entity("Revature.Room.DataAccess.Entities.Room", b =>
                {
                    b.Property<Guid>("RoomID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ComplexID")
                        .HasColumnType("uuid");

                    b.Property<Guid>("GenderId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("LeaseEnd")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("LeaseStart")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("NumberOfBeds")
                        .HasColumnType("integer");

                    b.Property<string>("RoomNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("RoomTypeId")
                        .HasColumnType("uuid");

                    b.HasKey("RoomID");

                    b.HasIndex("GenderId");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("Revature.Room.DataAccess.Entities.RoomType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("RoomType");

                    b.HasData(
                        new
                        {
                            Id = new Guid("95016bcc-f34b-421c-978d-b10fcac91841"),
                            Type = "Apartment"
                        },
                        new
                        {
                            Id = new Guid("01fd727b-b826-4f33-943f-00a5e3729197"),
                            Type = "Dormitory"
                        },
                        new
                        {
                            Id = new Guid("3dbe5495-af68-4c1d-847f-2f30a859ba93"),
                            Type = "Townhouse"
                        });
                });

            modelBuilder.Entity("Revature.Room.DataAccess.Entities.Room", b =>
                {
                    b.HasOne("Revature.Room.DataAccess.Entities.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Revature.Room.DataAccess.Entities.RoomType", "RoomType")
                        .WithMany()
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
